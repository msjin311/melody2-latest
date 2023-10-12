package com.acorn.melody2.service;

import com.acorn.melody2.entity.SoloArtist;
import com.acorn.melody2.repository.SoloArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SoloArtistService {

    private final SoloArtistRepository soloArtistRepository;

    @Autowired
    public SoloArtistService(SoloArtistRepository soloArtistRepository) {
        this.soloArtistRepository = soloArtistRepository;
    }

    public List<SoloArtist> getAllSoloArtists() {
        return soloArtistRepository.findAll();
    }

    public Optional<SoloArtist> getSoloArtistById(int id) {
        return soloArtistRepository.findById(id);
    }

    public SoloArtist saveSoloArtist(SoloArtist soloArtist) {
        return soloArtistRepository.save(soloArtist);
    }

    public void deleteSoloArtist(int id) {
        soloArtistRepository.deleteById(id);
    }
}
