package models;

import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;
import java.util.stream.Stream;

import static java.util.concurrent.CompletableFuture.supplyAsync;

/**
 * Provide JPA operations running inside of a thread pool sized to the connection pool
 */
public class JPARequestRepository implements RequestRepository {

    private final JPAApi jpaApi;
    private final DatabaseExecutionContext executionContext;

    @Inject
    public JPARequestRepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        this.jpaApi = jpaApi;
        this.executionContext = executionContext;
    }
    private <T> T wrap(Function<EntityManager, T> function) {
        return jpaApi.withTransaction(function);
    }


    @Override
    public CompletionStage<Request> add(Request Request ){
        return supplyAsync(() -> wrap(em -> insert(em, Request)), executionContext);
    }

    private Request insert(EntityManager em, Request Request) {
        em.persist(Request);
        return Request;
    }

    @Override
    public CompletionStage<Stream<Request>> list() {
        return supplyAsync(() -> wrap(em -> list(em)), executionContext);
    }

    private Stream<Request> list(EntityManager em) {
        List<Request> persons = em.createQuery("select p from Request p", Request.class).getResultList();
        return persons.stream();
    }

    @Override
    public CompletionStage<Request> del(String email) {
        return supplyAsync(() -> wrap(em -> delete(em, email)), executionContext);
    }

    private Request delete(EntityManager em, String email) {
        Request foundPerson = em.createQuery("select p from Request p where email=:email", Request.class).setParameter("email", email).getSingleResult();
        em.remove(foundPerson);
        return foundPerson;

    }
}

