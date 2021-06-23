package com.elberthbrandao.agendaapi.model.api.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.elberthbrandao.agendaapi.model.entity.Contato;
import com.elberthbrandao.agendaapi.model.repository.ContatoRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/contatos")
@RequiredArgsConstructor
public class ContatoController {

	private final ContatoRepository repository;
	
	@GetMapping
	public List<Contato> list(){
		return repository.findAll();
	}
	
	@PatchMapping("{id}/favorito")
	public void favorite(@PathVariable Integer id, @RequestBody boolean favorito) {
		Optional<Contato> contato = repository.findById(id);
		contato.ifPresent(c -> {
			c.setFavorito(favorito);
			repository.save(c);
		});
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Contato save(@RequestBody Contato contato) {
		return repository.save(contato);
	}
	
	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {
		this.repository.deleteById(id);
	}
}
