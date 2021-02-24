<?php
    require('conexion.php');

    class Persona{

        public function consultarTodo(){
            $conexion = new Conexion();
            $stmt = $conexion->prepare("SELECT * FROM persona");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_OBJ);
        }

        public function consultarPorId($id){
            $conexion = new Conexion();
            $stmt = $conexion->prepare("SELECT * FROM persona WHERE id= :id");
            $stmt->bindValue(":id", $id, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_OBJ);

        }

        public function guardar($nombre, $apellido, $fechaNacimiento, $direccion, $telefono){
            $conexion = new Conexion();
            $stmt = $conexion->prepare("INSERT INTO `persona`
                                                    (`nombre`,
                                                    `apellido`,
                                                    `fechaNacimiento`,
                                                    `direccion`,
                                                    `telefono`)
                                            VALUES (:nombre,
                                                    :apellido,
                                                    :fechaNacimiento,
                                                    :direccion,
                                                    :telefono);");
            $stmt->bindValue(":nombre", $nombre, PDO::PARAM_STR);
            $stmt->bindValue(":apellido", $apellido, PDO::PARAM_STR);
            $stmt->bindValue(":fechaNacimiento", $fechaNacimiento, PDO::PARAM_STR);
            $stmt->bindValue(":direccion", $direccion, PDO::PARAM_STR);
            $stmt->bindValue(":telefono", $telefono, PDO::PARAM_STR);
            if($stmt->execute()){
                return "OK";
            }else{
                return "Error: se ha generado un error al gurdar la información";
            }
        }

        public function modificar($id, $nombre, $apellido, $fechaNacimiento, $direccion, $telefono){
            $conexion = new Conexion();
            $stmt = $conexion->prepare("UPDATE `persona`
                                        SET `nombre` = :nombre,
                                         `apellido` = :apellido,
                                         `fechaNacimiento` = :fechaNacimiento,
                                         `direccion` = :direccion,
                                         `telefono` = :telefono
                                        WHERE `persona`.`id` = :id;");
            $stmt->bindValue(":nombre", $nombre, PDO::PARAM_STR);
            $stmt->bindValue(":apellido", $apellido, PDO::PARAM_STR);
            $stmt->bindValue(":fechaNacimiento", $fechaNacimiento, PDO::PARAM_STR);
            $stmt->bindValue(":direccion", $direccion, PDO::PARAM_STR);
            $stmt->bindValue(":telefono", $telefono, PDO::PARAM_STR);
            $stmt->bindValue(":id", $id, PDO::PARAM_INT);

            if($stmt->execute()){
                return "OK";
            }else{
                return "Error: se ha generado un error al modificar la información";
            }
        }

        public function eliminar($id){
            $conexion = new Conexion();
            $stmt = $conexion->prepare("DELETE FROM persona WHERE id = :id;");
            $stmt->bindValue(":id", $id, PDO::PARAM_INT);


            if($stmt->execute()){
                return "OK";
            }else{
                return "Error: se ha generado un error al eliminar la información";
            }
        }

    }
?>