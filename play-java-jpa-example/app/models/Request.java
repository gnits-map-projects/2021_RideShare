package models;

import javax.persistence.*;

@Entity
public class Request {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    public Long id;
    public String name;
    public String rollno;
    public Long phoneNumber;
    public String email;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public String getRollno() {
        return rollno;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setRollno(String rollno) {
        this.rollno = rollno;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

