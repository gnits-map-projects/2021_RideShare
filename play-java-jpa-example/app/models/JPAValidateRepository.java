package models;

import play.db.jpa.JPAApi;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;
import java.util.stream.Stream;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.lang.Exception;
import javax.persistence.NoResultException;

import static java.util.concurrent.CompletableFuture.supplyAsync;

/**
 * Provide JPA operations running inside of a thread pool sized to the connection pool
 */
public class JPAValidateRepository implements ValidateRepository {

    private final JPAApi jpaApi;
    private final DatabaseExecutionContext executionContext;

    @Inject
    public JPAValidateRepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        this.jpaApi = jpaApi;
        this.executionContext = executionContext;
    }
    private <T> T wrap(Function<EntityManager, T> function) {
        return jpaApi.withTransaction(function);
    }


    @Override
    public CompletionStage<Validate> add(Validate Validate ){
        return supplyAsync(() -> wrap(em -> insert(em, Validate)), executionContext);
    }

    private Validate insert(EntityManager em, Validate Validate) {
        em.persist(Validate);
        return Validate;
    }

    public Validate listuser(String rollno,Long phoneNumber) {
        try{
            EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
            EntityManager em= entityManagerFactory.createEntityManager();
            em.getTransaction().begin();

            Validate validateUser = em.createQuery("select p from Validate p where rollno=:rollno and phoneNumber=:phoneNumber",Validate.class).setParameter("rollno", rollno).setParameter("phoneNumber", phoneNumber).getSingleResult();

            return validateUser;
        }
        catch(NoResultException e){
            return null;
        }



    }
}
