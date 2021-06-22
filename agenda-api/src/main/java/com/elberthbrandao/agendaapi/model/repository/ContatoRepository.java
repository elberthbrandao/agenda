package com.elberthbrandao.agendaapi.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elberthbrandao.agendaapi.model.entity.Contato;

public interface ContatoRepository extends JpaRepository<Contato, Integer> {

}
