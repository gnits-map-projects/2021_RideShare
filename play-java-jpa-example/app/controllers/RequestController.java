
package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Request;
import models.RequestRepository;
import play.Logger;
import play.data.FormFactory;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.Controller;
import play.mvc.Result;
import models.ValidateRepository;

import javax.inject.Inject;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

import static play.libs.Json.toJson;
import static java.util.concurrent.CompletableFuture.supplyAsync;
import play.libs.Json;

public class RequestController extends Controller {

    private final FormFactory formFactory;
    private final RequestRepository RequestRepository;
    private final HttpExecutionContext ec;

    @Inject
    public RequestController(FormFactory formFactory, RequestRepository RequestRepository, HttpExecutionContext ec) {
        this.formFactory = formFactory;
        this.RequestRepository = RequestRepository;
        this.ec = ec;

    }

    public Result index() {
        return ok(views.html.index.render());
    }

    public CompletionStage<Result> add() {
        Request r=Json.fromJson(request().body().asJson(),Request.class);
        return RequestRepository.add(r).thenApplyAsync(p -> {
            return ok("Inserted");
        }, ec.current());
    }

    public CompletionStage<Result> getPersons() {

        return RequestRepository.list().thenApplyAsync(personStream -> {
            return ok(toJson(personStream.collect(Collectors.toList())));
        }, ec.current());
    }

    public CompletionStage<Result> deletePersons() {
        JsonNode json = request().body().asJson();
        String email = json.get("email").asText();
        return RequestRepository.del(email).thenApplyAsync(p -> {
            return ok("deleted "+email);
        }, ec.current());
    }
}

