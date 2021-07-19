package controllers;

import com.fasterxml.jackson.databind.JsonNode;

import models.*;
import play.Logger;
import play.data.FormFactory;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

import static play.libs.Json.toJson;
import static java.util.concurrent.CompletableFuture.supplyAsync;
import play.libs.Json;

public class ValidateController extends Controller {

    private final FormFactory formFactory;
    private final ValidateRepository ValidateRepository;
    private final PersonRepository PersonRepository;
    private final HttpExecutionContext ec;
    private final RequestRepository RequestRepository;

    @Inject
    public ValidateController(FormFactory formFactory, ValidateRepository ValidateRepository, HttpExecutionContext ec,PersonRepository PersonRepository,RequestRepository RequestRepository) {
        this.formFactory = formFactory;
        this.ValidateRepository = ValidateRepository;
        this.ec = ec;
        this.PersonRepository = PersonRepository;
        this.RequestRepository=RequestRepository;
    }

    public Result index() {
        return ok(views.html.index.render());
    }

    public Result getPerson() {
        JsonNode j=request().body().asJson();
        String rollno=j.get("rollno").asText();
        String phoneNumber1=j.get("phoneNumber").asText();
        Long phoneNumber= Long.parseLong(phoneNumber1);
        PersonController pc=new PersonController(formFactory, PersonRepository,  ec);
       // return ValidateRepository.listuser(rollno,phoneNumber).thenApplyAsync(ValidateStream -> {
            //return ok(toJson(ValidateStream.collect(Collectors.toList())));
       // }, ec.current());
        Validate ps = ValidateRepository.listuser(rollno,phoneNumber);
        if (ps == null) {

            return badRequest("No");
        } else {
            //String s = "{\",\"phone\":\"" + ps.phoneNumber+ "\", \"rollno\":\"" + ps.rollno+"\"  }";
            pc.addPerson();
            return ok("Yes");

        }


    }

    public CompletionStage<Result> add() {
        Validate r=Json.fromJson(request().body().asJson(),Validate.class);
        return ValidateRepository.add(r).thenApplyAsync(p -> {

            return ok("Inserted");
        }, ec.current());
    }

    }

