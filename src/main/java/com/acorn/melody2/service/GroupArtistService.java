package com.acorn.melody2.service;

import com.acorn.melody2.entity.GroupArtist;
import com.acorn.melody2.repository.GroupArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupArtistService {

    private final GroupArtistRepository groupArtistRepository;

    @Autowired
    public GroupArtistService(GroupArtistRepository groupArtistRepository) {
        this.groupArtistRepository = groupArtistRepository;
    }

    public List<GroupArtist> getAllGroupArtists() {
        return groupArtistRepository.findAll();
    }

    public Optional<GroupArtist> getGroupArtistById(int id) {
        return groupArtistRepository.findById(id);
    }

    public GroupArtist saveGroupArtist(GroupArtist groupArtist) {
        return groupArtistRepository.save(groupArtist);
    }

    public void deleteGroupArtist(int id) {
        groupArtistRepository.deleteById(id);
    }
}
