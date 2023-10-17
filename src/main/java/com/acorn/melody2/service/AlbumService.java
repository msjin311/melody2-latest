package com.acorn.melody2.service;

import com.acorn.melody2.entity.Album;
import com.acorn.melody2.repository.AlbumRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final EntityManager entityManager;
    private static final Logger logger = LoggerFactory.getLogger(AlbumService.class);

    @Autowired
    public AlbumService(AlbumRepository albumRepository, EntityManager entityManager) {
        this.albumRepository = albumRepository;
        this.entityManager = entityManager;
    }

    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }

    public Optional<Album> getAlbumById(int id) {
        return albumRepository.findById(id);
    }

    public Optional<Album> getAlbumWithArtistName(int albumId) {
        Optional<Album> albumOptional = albumRepository.findById(albumId);

        if (albumOptional.isPresent()) {
            Album album = albumOptional.get();
            String artistName = "";

            if (album.getSoloArtist() != null) {
                artistName = album.getSoloArtist().getSingerName();
            } else if (album.getGroupArtist() != null) {
                artistName = album.getGroupArtist().getGroupName();
            }

            // Set the artist name to the album
            album.setArtistName(artistName);

            return Optional.of(album);
        }

        return Optional.empty();
    }

    public Album saveAlbum(Album album) {
        return albumRepository.save(album);
    }

        //UserAccount update 랑 다르게 기존에 존재하는 entity를 불러와서 유효성 검사를 한다.(데이터 필드 값이 테이블에 저장가능한지)
    public Album updateAlbum(int id, Album updatedAlbum) throws ChangeSetPersister.NotFoundException {
        // Check if the album with the given ID exists
        Optional<Album> existingAlbumOptional = albumRepository.findById(id);
        if (existingAlbumOptional.isPresent()) {
            Album existingAlbum = existingAlbumOptional.get();

            // Update the fields of the existing album with the new data
            existingAlbum.setAlbumTitle(updatedAlbum.getAlbumTitle());
            existingAlbum.setCoverPhoto(updatedAlbum.getCoverPhoto());
            existingAlbum.setReleaseDate(updatedAlbum.getReleaseDate());
            existingAlbum.setAlbumInfo(updatedAlbum.getAlbumInfo());
            existingAlbum.setRating(updatedAlbum.getRating());
            existingAlbum.setReplyCount(updatedAlbum.getReplyCount());
            existingAlbum.setLikes(updatedAlbum.getLikes());
            existingAlbum.setMusicVideoLink(updatedAlbum.getMusicVideoLink());
            existingAlbum.setAlbumHashtags(updatedAlbum.getAlbumHashtags());

            // Save the updated album
            return albumRepository.save(existingAlbum);
        } else {
            // Handle the case where the album with the given ID doesn't exist
            throw new ChangeSetPersister.NotFoundException();
        }
    }
    public List<Album> searchAlbumsByTitle(String title) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Album> criteriaQuery = criteriaBuilder.createQuery(Album.class);
        Root<Album> root = criteriaQuery.from(Album.class);

        // Create a predicate to filter songs by title
        Predicate titlePredicate = criteriaBuilder.like(
                criteriaBuilder.lower(root.get("albumTitle")),
                "%" + title.toLowerCase() + "%"
        );

        criteriaQuery.where(titlePredicate);

        TypedQuery<Album> query = entityManager.createQuery(criteriaQuery);
        logger.warn("title : " + title);
        logger.warn(query.getResultList().toString());
        return query.getResultList();
    }

    public void deleteAlbum(int id) {
        albumRepository.deleteById(id);
    }


}
