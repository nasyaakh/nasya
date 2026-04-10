package com.winds.soft.innovation.sidekap;

import com.winds.soft.innovation.sidekap.controller.AbstractController;
import com.winds.soft.innovation.sidekap.dao.AbstractDAO;
import com.winds.soft.innovation.sidekap.dao.PenggunaDAO;
import com.winds.soft.innovation.sidekap.entities.Pengguna;
import com.winds.soft.innovation.windsencryptdecrypt.SecurityController;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.context.FacesContext;
import jakarta.faces.event.ActionEvent;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.servlet.http.HttpSession;
import java.util.List;

/**
 *
 * @author Wisnu Indarmoyo
 */
@Named(value = "loginController")
@SessionScoped
public class LoginController extends AbstractController<Pengguna> {

  @Inject
  PenggunaDAO dao;

  private String username;
  private String password;

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  @Override
  public void clearData() {
    username = "";
    password = "";
  }

  public void keluarSistem(ActionEvent event) {
    HttpSession ses = (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(false);
    ses.removeAttribute("auth");
    ses.invalidate();
    jumpToPage("");
  }

  public void masukSistem(ActionEvent event) {
    if (username.isEmpty() || password.isEmpty()) {
      sendMessage(MESSAGE.M_ERROR, "<b><i>Username / Password</i></b> tidak boleh kosong!", null);
      return;
    }

    if (!cekData()) {
      sendMessage(MESSAGE.M_ERROR, "<b><i>Username / Password</i></b> salah!", null);
      return;
    }

    jumpToPage("forms");
  }

  private boolean cekData() {
    List<Pengguna> list = dao.getDataList();
    SecurityController sec = new SecurityController();
    String pass = sec.getPasskey(password, "sidekap");

    for (Pengguna p : list) {
      if (p.getUserId().equals(username)) {
        if (p.getPassId().equals(pass)) {
          storeSession(p);
          return true;
        }
      }
    }

    return false;
  }

  private void storeSession(Pengguna auth) {
    HttpSession ses = (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(false);
    ses.setAttribute("auth", auth);
  }

  @Override
  public Pengguna findData(Object key) {
    return dao.getData(key);
  }

  @Override
  public AbstractDAO getDAO() {
    return dao;
  }

  @Override
  public Pengguna createInstance() {
    return new Pengguna();
  }
}
