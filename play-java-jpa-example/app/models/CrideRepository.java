package models;

import com.google.inject.ImplementedBy;

import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

@ImplementedBy(JPACrideRepository.class)
public interface CrideRepository {

    CompletionStage<Cride> add(Cride Cride);
    abstract Stream<Cride> findRide(String src, String dest);
    abstract Stream<Person> delete(String rollno);
    abstract Cride addRide(Cride Cride,String src,String dest,String rollno,String  rtime,String rdate,Long phoneNumber,String name );
    CompletionStage<Cride> incV(Long id);
    CompletionStage<Cride> decV(Long id);
    abstract Stream<Cride> replyRide(String src, String dest);
    abstract Stream<Cride> dateRide(String rdate);
}