package models;

import javax.persistence.*;

@Entity
public class Person {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    public Long id;

    public String rollno;
    public String name;
    public String email;
    public Long phoneNumber;
    public String pswd;
    public int age;
    public String gender;


    public int getAge() {
        return age;
    }

    public String getGender() {
        return gender;
    }

    public Long getId() {
        return id;
    }

    public String getRollno() {
        return rollno;
    }

    public String getEmail() {
        return email;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public String getPswd() {
        return pswd;
    }

    public String getName() {
        return name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPswd(String pswd) {
        this.pswd = pswd;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setRollno(String rollno) {
        this.rollno = rollno;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}

