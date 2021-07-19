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
public class JPAPersonRepository implements PersonRepository {

    private final JPAApi jpaApi;
    private final DatabaseExecutionContext executionContext;

    @Inject
    public JPAPersonRepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        this.jpaApi = jpaApi;
        this.executionContext = executionContext;
    }

    @Override
    public CompletionStage<Person> add(Person person) {
        return supplyAsync(() -> wrap(em -> insert(em, person)), executionContext);
    }

    @Override
    public CompletionStage<Person> del(String name) {
        return supplyAsync(() -> wrap(em -> delete(em, name)), executionContext);
    }


    @Override
    public CompletionStage<Person> update(String rollno, String name, String email, int age, Long phoneNumber, String gender, String pswd) {
        return supplyAsync(() -> wrap(em -> update(em,rollno, name, email,  age, phoneNumber, gender,pswd )), executionContext);
    }

    @Override
    public Person login(String rollno, String pswd) {
        return wrap(em -> findUser(em,rollno, pswd));
    }

    @Override
    public CompletionStage<Stream<Person>> list() {
        return supplyAsync(() -> wrap(em -> list(em)), executionContext);
    }

//    @Override
//    public  CompletionStage<Person> DeleteRoll(String rollno) {
//        return supplyAsync(() -> wrap(em -> DeleteRoll1(em,rollno)), executionContext);
//    }

    private <T> T wrap(Function<EntityManager, T> function) {
        return jpaApi.withTransaction(function);
    }

    private Person insert(EntityManager em, Person person) {
        em.persist(person);
        em.close();
        return person;
    }

    private Stream<Person> list(EntityManager em) {
        List<Person> persons = em.createQuery("select p from Person p", Person.class).getResultList();
        return persons.stream();
    }

    private Person delete(EntityManager em, String name) {
        String keyword = name+'%';
        try {
            int foundPerson = em.createNativeQuery("delete from Person p where p.rollno like :key", Person.class).setParameter("key", keyword).executeUpdate();

            if(foundPerson>0){
                List<Person> foundPerson1 = em.createQuery("select p from Person p where p.rollno like :key", Person.class).setParameter("key", keyword).getResultList();
                em.close();
                return foundPerson1.get(1);
            }
            else{return null;}
//        foundPerson1 = em.createQuery("select p from Person p where rollno=:rollno", Person.class).setParameter("rollno","16251A1261" ).getSingleResult();
        }
        catch(Exception e){
            return null;
        }


    }

//    public Person DeleteRoll1(EntityManager em,String key) {
//        String keyword = key+'%';
//        List<Person> foundPerson = em.createQuery("select p from Person p where p.rollno like :key", Person.class).setParameter("key",keyword ).getResultList();
//        em.remove(foundPerson);
//        //Validate foundPerson1 = em.createQuery("select v from Validate v where v.rollno like :key", Validate.class).setParameter("key",keyword ).getSingleResult();
//        //em.remove(foundPerson1);
//        return foundPerson.get(1);
//
//    }

    private Person findUser(EntityManager em, String rollNumber, String password) {
        Person person = em.createQuery("select p from Person p where rollno=:rollNumber and pswd=:password", Person.class).setParameter("rollNumber", rollNumber).setParameter("password", password).getSingleResult();
        em.close();
        return person;
    }

//    @Override
//    public Person login(String rollno, String pswd) {
//        try {
//            EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
//            EntityManager em = entityManagerFactory.createEntityManager();
//            em.getTransaction().begin();
//
//            Person foundPerson = em.createQuery("select p from Person p where rollno=:rollno and pswd=:pswd", Person.class).setParameter("rollno", rollno).setParameter("pswd", pswd).getSingleResult();
//            //em.remove(foundPerson);
//            return foundPerson;
//        } catch (NoResultException e) {
//            return null;
//        }
//
//
//    }



       public Person login1(String rollno) {
           try {
                EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
                EntityManager em = entityManagerFactory.createEntityManager();
               em.getTransaction().begin();

               Person PersonProfile = em.createQuery("select p from Person p where rollno=:rollno", Person.class).setParameter("rollno", rollno).getSingleResult();
                //em.remove(foundPerson);getSingleResult();
               //em.remove(foundPerson);
               em.close();
                return PersonProfile;
           } catch (NoResultException e) {
                return null;
            }


        }

    /*public String update(String rollno, String name, String email, int age, Long phoneNumber, String gender, String pswd) {
        try {
            EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
            EntityManager em = entityManagerFactory.createEntityManager();
            em.getTransaction().begin();

            int updateProfile = em.createQuery("update Person  SET name:=name,email:=email,age:=age,phoneNumber:=phoneNumber,gender:=gender,pswd:=pswd where rollno:=rollno")
                    .setParameter("rollno", rollno)
                    .setParameter("name", name)
                    .setParameter("email", email)
                    .setParameter("age", age)
                    .setParameter("phoneNumber", phoneNumber)
                    .setParameter("gender", gender)
                    .setParameter("pswd", pswd).executeUpdate();
            //em.remove(foundPerson);getSingleResult();
            //em.remove(foundPerson);
            if (updateProfile == 0) {
                return "not found";
            } else {
                return "updated";
            }
        } catch (NoResultException e) {
            return "exception";
        }


    }*/
    /*public String update( String rollno, String name, String email, int age, Long phoneNumber, String gender, String pswd) {
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
        EntityManager em = entityManagerFactory.createEntityManager();
        em.getTransaction().begin();
        int i = em.createQuery("update Person SET name=:name,email=:email,phoneNumber=:phoneNumber,gender=:gender,age:=age,pswd:=pswd where rollno=:rollno")
                .setParameter("name", name)
                .setParameter("email", email)
                .setParameter("phoneNumber", phoneNumber)
                .setParameter("gender", gender)
                .setParameter("age", age)
                .setParameter("pswd", pswd)
                .setParameter("rollno", rollno)
                .executeUpdate();
        //int i=q.executeUpdate();
        if (i != 0) {
            //Person persons = em.createQuery("select p from Person p where id=:id",Person.class).setParameter("id", id).getSingleResult();
            return "changed";
        } else {
            return null;

        }
    }*/

    private Person update(EntityManager em,String rollno, String name, String email, int age, Long phoneNumber, String gender, String pswd) {
        int i = em.createQuery("update Person SET name=:name,email=:email,phoneNumber=:phoneNumber,gender=:gender,age=:age,pswd=:pswd where rollno=:rollno")
                .setParameter("name", name)
                .setParameter("email", email)
                .setParameter("phoneNumber", phoneNumber)
                .setParameter("gender", gender)
                .setParameter("age", age)
                .setParameter("pswd", pswd)
                .setParameter("rollno", rollno)
                .executeUpdate();
        //int i=q.executeUpdate();
        if(i!=0){
            Person persons = em.createQuery("select p from Person p where rollno=:rollno",Person.class).setParameter("rollno", rollno).getSingleResult();
            em.close();
            return persons;}
        else
        {
            return null;
        }
    }

    public Person checkRollno(String rollno) {
        try {
            EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("defaultPersistenceUnit");
            EntityManager em = entityManagerFactory.createEntityManager();
            em.getTransaction().begin();

            Person PersonProfile = em.createQuery("select p from Person p where rollno=:rollno", Person.class).setParameter("rollno", rollno).getSingleResult();
            //em.remove(foundPerson);getSingleResult();
            //em.remove(foundPerson);
            em.close();
            return PersonProfile;
        } catch (NoResultException e) {
            return null;
        }


    }

}