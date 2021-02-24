<?php
    require '../modelo/persona.modelo.php';

    if($_POST){
        
        $persona = new Persona();

        switch($_POST["accion"]){
            case "consultar": 
                echo json_encode($persona->consultarTodo());
            break;
            case "consultar_id": 
                echo json_encode($persona->consultarPorId($_POST["id"]));
            break;
            case "guardar": 
                $nombre = $_POST["nombre"];
                $apellido = $_POST["apellido"];
                $fechaNacimiento = $_POST["fechaNacimiento"];
                $direccion = $_POST["direccion"];
                $telefono = $_POST["telefono"];

                if($nombre == ""){
                    echo json_encode("Debe ingresar el nombre");
                    return;
                }
                if($apellido == ""){
                    echo json_encode("Debe ingresar el apellido");
                    return;
                }
                if($fechaNacimiento == ""){
                    echo json_encode("Debe ingresar la fecha de nacimiento");
                    return;
                }
                if($direccion == ""){
                    echo json_encode("Debe ingresar la direccion");
                    return;
                }
                if($telefono == ""){
                    echo json_encode("Debe ingresar el telefono");
                    return;
                }


                $respuesta = $persona->guardar($nombre, $apellido, $fechaNacimiento, $direccion, $telefono);
                echo json_encode($respuesta);
            break;
            case "modificar": 
                $nombre = $_POST["nombre"];
                $apellido = $_POST["apellido"];
                $fechaNacimiento = $_POST["fechaNacimiento"];
                $direccion = $_POST["direccion"];
                $telefono = $_POST["telefono"];
                $id = $_POST["id"];

                if($nombre == ""){
                    echo json_encode("Debe ingresar el nombre");
                    return;
                }
                if($apellido == ""){
                    echo json_encode("Debe ingresar el apellido");
                    return;
                }
                if($fechaNacimiento == ""){
                    echo json_encode("Debe ingresar la fecha de nacimiento");
                    return;
                }
                if($direccion == ""){
                    echo json_encode("Debe ingresar la direccion");
                    return;
                }
                if($telefono == ""){
                    echo json_encode("Debe ingresar el telefono");
                    return;
                }

                $respuesta = $persona->modificar($id, $nombre, $apellido, $fechaNacimiento, $direccion, $telefono);
                echo json_encode($respuesta);
                
            break;
            case "eliminar": 
                $id = $_POST["id"];
                $respuesta = $persona->eliminar($id);
                echo json_encode($respuesta);
            break;
        }

    }

?>