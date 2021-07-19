package models;

import com.google.inject.ImplementedBy;

import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

/**
 * This interface provides a non-blocking API for possibly blocking operations.
 */
@ImplementedBy(JPAValidateRepository.class)
public interface ValidateRepository {


    //CompletionStage<Stream<Validate>> list();
    abstract Validate listuser(String rollno,Long phoneNumber);
    CompletionStage<Validate> add(Validate Validate);

}