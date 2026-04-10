package com.winds.soft.innovation.sidekap.controller;

import com.winds.soft.innovation.sidekap.dao.AbstractDAO;
import com.winds.soft.innovation.sidekap.dao.PenggunaDAO;
import com.winds.soft.innovation.sidekap.dao.RuanganDAO;
import com.winds.soft.innovation.sidekap.entities.Pengguna;
import com.winds.soft.innovation.sidekap.entities.Ruangan;
import com.winds.soft.innovation.windsencryptdecrypt.SecurityController;
import jakarta.faces.event.ActionEvent;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import java.util.List;

/**
 *
 * @author Wisnu Indarmoyo
 */
@Named(value = "penggunaController")
@ViewScoped
public class PenggunaController extends AbstractController<Pengguna> {

  @Inject
  private PenggunaDAO dao;

  @Inject
  RuanganDAO ruanganDao;

  private String password;

  @Override
  public AbstractDAO getDAO() {
    return this.dao;
  }

  @Override
  public void openPage() {
    super.openPage();
    if (getData().getPassId() != null) {
      password = (getData().getPassId().isEmpty() ? "" : getData().getPassId());
    }
  }

  @Override
  public void clearData() {
    super.clearData();
    password = "";
  }

  @Override
  public Pengguna createInstance() {
    return new Pengguna();
  }

  @Override
  public Pengguna findData(Object key) {
    return this.dao.getData(Integer.valueOf(String.valueOf(key)));
  }

  @Override
  public void storeData(ActionEvent event) {
    if (!password.equals(getData().getPassId())) {
      SecurityController sec = new SecurityController();
      password = sec.getPasskey(getData().getPassId(), "sidekap");
      getData().setPassId(password);
    }

    super.storeData(event);
  }

  public List<Ruangan> getListRuangan() {
    return ruanganDao.getDataList();
  }

}
