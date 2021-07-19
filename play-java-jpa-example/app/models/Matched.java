package models;

import javax.persistence.*;

@Entity
public class Matched {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int id;
    public String crollno;
    public String rtime;
    public String src;
    public String dest;
    public String rdate;
    public String tname;
    public Long phoneNumber;
    public String frollno;
    public Long cid;
    public String cname;
    public String status;

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public void setCid(Long cid) {
        this.cid = cid;
    }

    public Long getCid() {
        return cid;
    }

    public void setid(int id) {
        this.id = id;
    }

    public int getid() {
        return id;
    }
    public String getFrollno() {
        return frollno;
    }

    public void setFrollno(String frollno) {
        this.frollno = frollno;
    }

    public String getCrollno() {
        return crollno;
    }

    public void setCrollno(String crollno) {
        this.crollno = crollno;
    }

    public String getTname() {
        return tname;
    }

    public void setTname(String tname) {
        this.tname = tname;
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



    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}