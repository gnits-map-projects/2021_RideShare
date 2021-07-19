package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Matched;
import models.MatchedRepository;
import models.CrideRepository;
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
import java.util.stream.Collectors;
import java.util.stream.Stream;


public class MatchedController extends Controller {

    private final FormFactory formFactory;
    private final MatchedRepository MatchedRepository;
    private final CrideRepository CrideRepository;
    private final HttpExecutionContext ec;
    public Long cid;
    @Inject
    public MatchedController(FormFactory formFactory, MatchedRepository MatchedRepository,CrideRepository CrideRepository, HttpExecutionContext ec) {
        this.formFactory = formFactory;
        this.MatchedRepository =MatchedRepository;
        this.CrideRepository= CrideRepository;
        this.ec = ec;
    }

    public Result index() {
        return ok(views.html.index.render());
    }

   public CompletionStage<Result> addMride() {
        Matched Mride=Json.fromJson(request().body().asJson(),Matched.class);
        return MatchedRepository.add(Mride).thenApplyAsync(p -> {
            return ok("Inserted");
        }, ec.current());
    }


    public Result History() {
        JsonNode j = request().body().asJson();
        String frollno = j.get("frollno").asText();
        Stream<Matched> ps = MatchedRepository.History(frollno);

        if (ps == null) {
            return badRequest("did not find");
        } else {
            // String s = "{ \"rollno\":\"" + ps.rollno+"\"}";
            return ok(toJson(ps.collect(Collectors.toList())));

        }

    }
    public Result rideDetails() {
        JsonNode j = request().body().asJson();
        String cid1 = j.get("cid").asText();
        Long cid=Long.parseLong(cid1);
        Stream<Matched> ps = MatchedRepository.rideDetails(cid);

        if (ps == null) {
            return badRequest("did not find");
        } else {
            // String s = "{ \"rollno\":\"" + ps.rollno+"\"}";
            return ok(toJson(ps.collect(Collectors.toList())));

        }

    }

    public Result deleteRide() {
        JsonNode json = request().body().asJson();
        String frollno = json.get("frollno").asText();
        String cid1 = json.get("cid").asText();
        Long cid = Long.parseLong(cid1);
        Matched m = MatchedRepository.delete(frollno,cid);
       CrideController c= new CrideController(formFactory, CrideRepository,MatchedRepository, ec);
       if(m==null){
           return badRequest("not deleted");
       }
       else{
           c.incVacancy();
          return ok("deleted"+m .frollno+"from matched");
       }
    }

    public Result checkRide() {
        JsonNode j = request().body().asJson();
        String cid1 = j.get("cid").asText();
        Long cid=Long.parseLong(cid1);
        String frollno = j.get("frollno").asText();
        Matched ps = MatchedRepository.checkRide(cid,frollno);

        if (ps == null) {
            return ok("Did not join yet");
        } else {
            // String s = "{ \"rollno\":\"" + ps.rollno+"\"}";
            return badRequest("already joined");

        }


    }
}