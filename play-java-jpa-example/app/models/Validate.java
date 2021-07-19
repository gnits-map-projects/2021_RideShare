package models;

import javax.persistence.*;

@Entity
public class Validate {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    public Long id;

    public String rollno;
    public Long phoneNumber;





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

