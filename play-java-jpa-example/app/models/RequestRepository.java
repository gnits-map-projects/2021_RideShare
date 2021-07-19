package models;

import com.google.inject.ImplementedBy;

import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

@ImplementedBy(JPARequestRepository.class)
public interface RequestRepository {
    CompletionStage<Stream<Request>> list();
    CompletionStage<Request> add(Request Request);
    CompletionStage<Request> del(String email);
}