package models;

import javax.persistence.*;

@Entity
@Table(name="Cride")
public class Cride {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    public Long id;

    public String rollno;
    public String rtime;
    public String src;
    public String dest;
    public String rdate;
    public String name;
    public Long phoneNumber;
    public int vacancy;

    public void setRollno(String rollno) {
        this.rollno = rollno;
    }

    public String getRollno() {
        return rollno;
    }

    public String getRtime() {
        return rtime;
    }

    public void setRtime(String rtime) {
        this.rtime = rtime;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public String getDest() {
        return dest;
    }

    public void setDest(String dest) {
        this.dest = dest;
    }

    public String getRdate() {
        return rdate;
    }

    public void setRdate(String rdate) {
        this.rdate = rdate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public int getVacancy() {
        return vacancy;
    }

    public void setVacancy(int vacancy) {
        this.vacancy = vacancy;
    }
}