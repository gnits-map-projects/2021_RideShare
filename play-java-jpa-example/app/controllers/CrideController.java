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
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CrideController extends Controller {

    private final FormFactory formFactory;
    private final CrideRepository CrideRepository;
    private final HttpExecutionContext ec;
    private final MatchedRepository MatchedRepository;

    @Inject
    public CrideController(FormFactory formFactory, CrideRepository CrideRepository,MatchedRepository MatchedRepository, HttpExecutionContext ec) {
        this.formFactory = formFactory;
        this.CrideRepository =CrideRepository;
        this.ec = ec;
        this.MatchedRepository=MatchedRepository;
    }

    public Result index() {
        return ok(views.html.index.render());
    }

    public CompletionStage<Result> addCride() {
        Cride Cride=Json.fromJson(request().body().asJson(),Cride.class);
        //MatchedController mc = new MatchedController(formFactory, MatchedRepository, ec);
        return CrideRepository.add(Cride).thenApplyAsync(p -> {
            return ok("Inserted");
        }, ec.current());

    }
    public Result addRide()
    {
        Cride Cride=Json.fromJson(request().body().asJson(),Cride.class);
        JsonNode j = request().body().asJson();
        String src = j.get("src").asText();
        String dest = j.get("dest").asText();
        String rollno = j.get("rollno").asText();
        String rtime = j.get("rtime").asText();
        String rdate = j.get("rdate").asText();
        String phoneNumber1 = j.get("phoneNumber").asText();
        String name = j.get("name").asText();
        Long phoneNumber = Long.parseLong(phoneNumber1);
        Cride ps = CrideRepository.addRide(Cride,src, dest, rollno, rtime, rdate, phoneNumber,name);
        String s = "{ \"id\":\"" + ps.id+"\"}";
        //mc.addMride(ps.id)
        return ok(s);

    }

    public Result findRide() {
        JsonNode j = request().body().asJson();
        String src = j.get("src").asText();
        String dest = j.get("dest").asText();
        Stream<Cride> ps = CrideRepository.findRide(src,dest);

        if (ps == null) {
            return badRequest("did not find");
        } else {
           // String s = "{ \"rollno\":\"" + ps.rollno+"\"}";
            return ok(toJson(ps.collect(Collectors.toList())));
        }
    }

    public Result delete() {
        JsonNode j = request().body().asJson();
        String rollno = j.get("selectValue").asText();
        Stream<Person> ps = CrideRepository.delete(rollno);

        if (ps == null) {
            return badRequest("did not find");
        } else {
            // String s = "{ \"rollno\":\"" + ps.rollno+"\"}";
            return ok("deleted");
        }
    }
    public CompletionStage<Result> incVacancy() {
        JsonNode j=request().body().asJson();
        //String vacancy1 = j.get("vacancy").asText();
       // int vacancy = Integer.parseInt(vacancy1);
        String id1 = j.get("id").asText();
        Long id = Long.parseLong(id1);
        return CrideRepository.incV(id).thenApplyAsync(ps -> {
            //return redirect(routes.PersonController.index());
            //String s="{\"vacancy\":\""+ps.vacancy+"\"}";
            return ok();
        }, ec.current());
    }

    public CompletionStage<Result> decVacancy() {
        JsonNode j=request().body().asJson();
       // String vacancy1 = j.get("vacancy").asText();
       // int vacancy = Integer.parseInt(vacancy1);
        String id1 = j.get("id").asText();
        Long id = Long.parseLong(id1);
        return CrideRepository.decV(id).thenApplyAsync(ps -> {
            //return redirect(routes.PersonController.index());
            //String s="{\"vacancy\":\""+ps.vacancy+"\"}";
            return ok();
        }, ec.current());
    }

    public Result replyRide() {
        JsonNode j = request().body().asJson();
        String src = j.get("src").asText();
        String dest = j.get("dest").asText();
//        String time = j.get("rtime").asText();
//        String date = j.get("rdate").asText();
        Stream<Cride> ps = CrideRepository.replyRide(src,dest);

        if (ps == null) {
            return badRequest("did not find");
        } else {
            // String s = "{ \"rollno\":\"" + ps.rollno+"\"}";
            return ok(toJson(ps.collect(Collectors.toList())));
        }
    }

    public Result dateRide() {
        JsonNode j = request().body().asJson();
        String rdate = j.get("rdate").asText();
        Stream<Cride> ps = CrideRepository.dateRide(rdate);

        if (ps == null) {
            return badRequest("did not find");
        } else {
            return ok(toJson(ps.collect(Collectors.toList())));
        }
    }


}