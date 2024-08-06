package com.vmo.movieapp.service;


import com.vmo.movieapp.dto.NewType;
import com.vmo.movieapp.dto.TypeDTO;
import com.vmo.movieapp.entity.Type;
import com.vmo.movieapp.repository.TypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TypeService {
    private final TypeRepository typeRepository;
    public void addType(NewType newType){
        Type type = new Type();
        type.setName(newType.getName());
        typeRepository.save(type);
    };
    public List<TypeDTO> getType() {
        List<Type> types = typeRepository.findAll();
        List<TypeDTO> typeDTOList = new ArrayList<>();

        for (Type type : types) {
            TypeDTO typeDTO = new TypeDTO();
            typeDTO.setId(type.getId());
            typeDTO.setName(type.getName());

            typeDTOList.add(typeDTO);
        }

        return typeDTOList;
    }
}
