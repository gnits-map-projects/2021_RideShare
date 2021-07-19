package models;

import play.db.jpa.JPAApi;
import models.JPAMatchedRepository;
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
import org.hibernate.Query;

import static java.util.concurrent.CompletableFuture.supplyAsync;
import java.util.stream.Stream;
/**
 * Provide JPA operations running inside of a thread pool sized to the connection pool
 */
public class JPACrideRepository implements CrideRepository {

    private final JPAApi jpaApi;
    private final DatabaseExecutionContext executionContext;
    private final JPAMatchedRepository JPAMatchedRepository;
    private final JPAPersonRepository JPAPersonRepository;

    @Inject
    public JPACrideRepository(JPAApi jpaApi, DatabaseExecutionContext executionContext,JPAMatchedRepository JPAMatchedRepository,JPAPersonRepository JPAPersonRepository) {
        this.jpaApi = jpaApi;
        this.executionContext = executionContext;
        this.JPAMatchedRepository=JPAMatchedRepository;
        this.JPAPersonRepository =JPAPersonRepository;
    }

    @Override
    public CompletionStage<Cride> add(Cride Cride) {
        return supplyAsync(() -> wrap(em -> insert(em, Cride)), executionContext);
    }

    @Override
    public CompletionStage<Cride> incV(Long id) {
        return supplyAsync(() -> wrap(em -> incV(em,id)), executionContext);
    }

    @Override
    public CompletionStage<Cride> decV(Long id) {
        return supplyAsync(() -> wrap(em -> decV(em,id)), executionContext);
    }
    private <T> T wrap(Function<EntityManager, T> function) {
        return jpaApi.withTransaction(function);
    }
    private Cride insert(EntityManager em, Cride Cride) {
        em.persist(Cride);

        return Cride;
    }
    public Stream<Cride> findRide(String src,String dest) {
        try {
            EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
            EntityManager em = entityManagerFactory.createEntityManager();
            em.getTransaction().begin();

            List<Cride> find= em.createQuery("select c from Cride c where src=:src and dest=:dest", Cride.class).setParameter("src", src).setParameter("dest", dest).getResultList();
            em.close();
            return find.stream();
        } catch (NoResultException e) {
            return null;
        }


    }

    public Stream<Cride> dateRide(String rdate) {
        try {
            EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
            EntityManager em = entityManagerFactory.createEntityManager();
            em.getTransaction().begin();

            List<Cride> find= em.createQuery("select c from Cride c where rdate=:rdate", Cride.class).setParameter("rdate", rdate).getResultList();
            em.close();
            return find.stream();
        } catch (NoResultException e) {
            return null;
        }


    }

    public Stream<Person> delete(String key) {
        try {
            String keyword = key+'%';
            EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
            EntityManager em = entityManagerFactory.createEntityManager();
            em.getTransaction().begin();
            List<Person> foundPerson = em.createQuery("select p from Person p where p.rollno like :key", Person.class).setParameter("key",keyword).getResultList();
            em.remove(foundPerson);
            em.close();
            return foundPerson.stream();

        } catch (NoResultException e) {
            return null;
        }


    }


    //    public Cride addRide(Cride Cride,String src,String dest,String rollno,String  rtime,String rdate,Long phoneNumber,String name ) {
//        try {
//            EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
//           EntityManager em = entityManagerFactory.createEntityManager();
//           add(Cride);
//           em.getTransaction().begin();
//           Cride find= em.createQuery("select c from Cride c where src=:src and dest=:dest and rollno=:rollno and rtime=:rtime and phoneNumber=:phoneNumber and rdate=:rdate", Cride.class)
//                   .setParameter("src", src)
//                   .setParameter("dest", dest)
//                   .setParameter("rollno", rollno)
//                   .setParameter("rtime", rtime)
//                   .setParameter("phoneNumber", phoneNumber)
//                   .setParameter("rdate", rdate)
//                   .getSingleResult();
//            return find;
//        } catch (NoResultException e) {
//            return null;
//        }
//
//
//    }
   @Override
    public Cride addRide(Cride Cride,String src,String dest,String rollno,String  rtime,String rdate,Long phoneNumber,String name ) {
        try {
            EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
            EntityManager em = entityManagerFactory.createEntityManager();
           // Cride c= insert(em,Cride);
            //add(Cride);
            //em.getTransaction().begin();
            // if(c.id !=0) {
                 Cride f = em.createQuery("select c from Cride c where src=:src and dest=:dest and rollno=:rollno and rtime=:rtime and phoneNumber=:phoneNumber and rdate=:rdate", Cride.class)
                         .setParameter("src", src)
                         .setParameter("dest", dest)
                         .setParameter("rollno", rollno)
                         .setParameter("rtime", rtime)
                         .setParameter("phoneNumber", phoneNumber)
                         .setParameter("rdate", rdate)
                         .getSingleResult();

                 em.close();
                 return f;
        }

        catch (Exception e) {
            return null;
        }

    }
 private int getVacancy(EntityManager em,Long id){
     Cride cride = em.createQuery("select c from Cride c where id=:id",Cride.class).setParameter("id", id).getSingleResult();
     return cride.vacancy;
 }

   private Cride incV(EntityManager em,Long id) {
        int vacancy=getVacancy(em,id);
       int i = em.createQuery("update Cride SET vacancy=:vacancy+1 where id=:id")
               .setParameter("vacancy", vacancy)
               .setParameter("id", id)
               .executeUpdate();
       //int i=q.executeUpdate();
       if(i!=0){
           Cride cride = em.createQuery("select c from Cride c where id=:id",Cride.class).setParameter("id", id).getSingleResult();
           return cride;}
       else
       {
           return null;
       }
   }

    private Cride decV(EntityManager em,Long id) {
        int vacancy=getVacancy(em,id);
        int i = em.createQuery("update Cride SET vacancy=:vacancy-1 where id=:id")
                .setParameter("vacancy", vacancy)
                .setParameter("id", id)
                .executeUpdate();
        //int i=q.executeUpdate();
        if(i!=0){
            Cride cride = em.createQuery("select c from Cride c where id=:id",Cride.class).setParameter("id", id).getSingleResult();
            return cride;}
        else
        {
            return null;
        }
    }

    public Stream<Cride> replyRide(String src,String dest) {
        try {
            EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
            EntityManager em = entityManagerFactory.createEntityManager();
            em.getTransaction().begin();

            List<Cride> find= em.createQuery("select c from Cride c where src=:src and dest=:dest", Cride.class)
                    .setParameter("src", src)
                    .setParameter("dest", dest)
                    //.setParameter("time", time)
                    //.setParameter("date", date)
                    .getResultList();
            return find.stream();
        } catch (NoResultException e) {
            return null;
        }


    }



}
