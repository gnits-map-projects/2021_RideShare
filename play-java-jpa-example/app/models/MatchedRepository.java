package models;

import com.google.inject.ImplementedBy;

import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

@ImplementedBy(JPAMatchedRepository.class)
public interface MatchedRepository {

    CompletionStage<Matched> add(Matched Matched);
    //abstract Stream<Cride> findRide(String src, String dest);
    abstract Stream<Matched> History(String frollno);
    abstract Stream<Matched> rideDetails(Long cid);
    abstract Matched delete(String frollno,Long cid);
    abstract Matched checkRide(Long cid,String frollno);

    //abstract Matched addRide(Matched Matched,Long id,String src,String dest,String rollno,String  rtime,String rdate,Long phoneNumber,String name );
}