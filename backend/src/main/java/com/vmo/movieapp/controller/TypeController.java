
package com.vmo.movieapp.controller;
import com.vmo.movieapp.dto.NewType;
import com.vmo.movieapp.dto.TypeDTO;
import com.vmo.movieapp.service.TypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/type")
@RequiredArgsConstructor
public class TypeController {

    private final TypeService typeService;

    @PostMapping("/add")
    public void addType(@RequestBody NewType newType){
        typeService.addType(newType);
    }

    @GetMapping("/get")
    public List<TypeDTO> getType(){
        return typeService.getType();
    }
}

