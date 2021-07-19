package models;

import com.google.inject.ImplementedBy;

import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

/**
 * This interface provides a non-blocking API for possibly blocking operations.
 */
@ImplementedBy(JPAPersonRepository.class)
public interface PersonRepository {

    CompletionStage<Person> add(Person person);

    CompletionStage<Stream<Person>> list();

    CompletionStage<Person> del(String name);

//    CompletionStage<Person> DeleteRoll(String rollno);


    abstract Person login1(String Rollno);

    abstract Person login(String Rollno,String password);

    //abstract String update(String rollno,String name,String email,int age,Long phoneNumber,String gender,String pswd);

    CompletionStage<Person> update(String rollno,String name,String email,int age,Long phoneNumber,String gender,String pswd);

    abstract Person checkRollno(String Rollno);

}
