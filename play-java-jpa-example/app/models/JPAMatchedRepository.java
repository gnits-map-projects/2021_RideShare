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
import java.util.stream.Stream;
/**
 * Provide JPA operations running inside of a thread pool sized to the connection pool
 */
public  class JPAMatchedRepository implements MatchedRepository {

    private final JPAApi jpaApi;
    private final DatabaseExecutionContext executionContext;

    @Inject
    public JPAMatchedRepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        this.jpaApi = jpaApi;
        this.executionContext = executionContext;
    }

    @Override
    public CompletionStage<Matched> add(Matched Matched) {
        return supplyAsync(() -> wrap(em -> insert(em, Matched)), executionContext);
    }
    private <T> T wrap(Function<EntityManager, T> function) {
        return jpaApi.withTransaction(function);
    }
    private Matched insert(EntityManager em, Matched Matched) {
        em.persist(Matched);
        em.close();
        return Matched;
    }

    @Override
    public Matched delete(String frollno, Long cid) {
        return wrap(em -> delete1(em,frollno, cid));
    }
   /* public Stream<> findRide(String src,String dest) {
        try {
            EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
            EntityManager em = entityManagerFactory.createEntityManager();
            em.getTransaction().begin();

            List<Cride> find= em.createQuery("select c from Cride c where src=:src and dest=:dest", Cride.class).setParameter("src", src).setParameter("dest", dest).getResultList();
            return find.stream();
        } catch (NoResultException e) {
            return null;
        }


    }*/
   public Stream<Matched> History(String frollno) {
       try {
           String status="upcoming";
           EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
           EntityManager em = entityManagerFactory.createEntityManager();
           em.getTransaction().begin();

           List<Matched> find= em.createQuery("select m from Matched m where frollno=:frollno", Matched.class).setParameter("frollno", frollno).getResultList();
            em.close();
           return find.stream();
       } catch (NoResultException e) {
           return null;
       }


   }


    public Matched addRide(Matched Matched,Long cid,String src,String dest,String rollno,String  rtime,String rdate,Long phoneNumber,String name  ) {
        try {
            EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
            EntityManager em = entityManagerFactory.createEntityManager();
            add(Matched);
            em.getTransaction().begin();
            Matched find= em.createQuery("update Matched m set cid=:id where src=:src and dest=:dest and crollno=:crollno and rtime=:rtime and phoneNumber=:phoneNumber and rdate=:rdate", Matched.class)
                    .setParameter("cid", cid)
                    .setParameter("src", src)
                    .setParameter("dest", dest)
                    .setParameter("rollno", rollno)
                    .setParameter("rtime", rtime)
                    .setParameter("phoneNumber", phoneNumber)
                    .setParameter("rdate", rdate)
                    .getSingleResult();
          em.close();
            return find;
        } catch (NoResultException e) {
            return null;
        }


    }

    public Stream<Matched> rideDetails(Long cid) {
        try {
            EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
            EntityManager em = entityManagerFactory.createEntityManager();
            em.getTransaction().begin();

            List<Matched> find= em.createQuery("select m from Matched m where cid=:cid and status=:status", Matched.class).setParameter("cid", cid).setParameter("status", "upcoming").getResultList();
            em.close();
            return find.stream();
        } catch (NoResultException e) {
            return null;
        }


    }
    public Matched delete1(EntityManager em,String frollno,Long cid) {
       String status="cancelled";

//       EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
//       EntityManager em = entityManagerFactory.createEntityManager();
           //em.getTransaction().begin();
           //String status = "cancelled";
           int foundPerson = em.createQuery("update Matched m set m.status=:status where m.cid=:cid and m.frollno=:frollno").setParameter("status", status).setParameter("cid", cid).setParameter("frollno", frollno).executeUpdate();

           if (foundPerson != 0) {
               Matched find = em.createQuery("select m from Matched m where cid=:cid and frollno=:frollno", Matched.class).setParameter("cid", cid).setParameter("frollno", frollno).getSingleResult();
              em.close();
               return find;
           } else {
               return null;
           }

    }

    public Matched checkRide(Long cid, String frollno) {
        try {
            EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
            EntityManager em = entityManagerFactory.createEntityManager();
            em.getTransaction().begin();
            String status="upcoming";
            Matched find= em.createQuery("select m from Matched m where cid=:cid and frollno=:frollno and status=:status", Matched.class).setParameter("cid", cid).setParameter("frollno", frollno).setParameter("status", status).getSingleResult();
           em.close();
            return find;
        } catch (NoResultException e) {
            return null;
        }


    }



}
