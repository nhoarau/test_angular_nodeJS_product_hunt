import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";
import DetailCard from "../ui/DetailCard";
import Checkpoints from "../ui/Checkpoints";
import defaultImage from '../assets/images/default-image.png';

export function EquipmentDetail() {

    //Firebase
    const getEquipments = useSelector((state) => state.firebase.ordered.Equipments);
    const getCheckpoints  = useSelector((state) => state.firebase.ordered.Checkpoints);

    //CSV files
    const getEquipmentsFromCsv = useSelector((state) => state.equipmentCsv.equipments);
    const getCheckpointsFromCsv = useSelector((state) => state.checkpointCsv.checkpoints);


    // get equipment key from Link
    let location = useLocation();

    const equipment = getEquipments && getEquipments.find(eq => eq && eq.key === location.state.equipmentId);
    const checkpoints = getCheckpoints && getCheckpoints.filter(cp => cp.value.equipmentKey === location.state.equipmentId);
    
    const equipmentCsv = getEquipmentsFromCsv && getEquipmentsFromCsv.find(eq => eq && eq.key === location.state.equipmentId);
    const checkpointCsv = getCheckpointsFromCsv && getCheckpointsFromCsv.filter(eq => eq && eq.equipmentKey === location.state.equipmentId);

    return (
        <div className="equipmentCard">
            <div className = 'equipment-detail'>
                {   equipment ? 
                    <div>
                        <DetailCard
                        name = {equipment.value.name}
                        brand = {equipment.value.brand}
                        domain = {equipment.value.domain}
                        nbFaults = {equipment.value.nbFaults}
                        building =  {equipment.value.building}
                        niveau = {equipment.value.niveau}
                        local = {equipment.value.local}
                        model = {equipment.value.model}
                        serialNumber = {equipment.value.serialNumber}
                        quantity = {equipment.value.quantity}
                        status = {equipment.value.status}
                        notes = {equipment.value.notes}
                        photo = {equipment.value.photo}
                        />
                        <Checkpoints checkpoints = {checkpoints} fromCsv={false}/>
                    </div>
                :
                    equipmentCsv ? 
                    <div>
                        <DetailCard
                            name = {equipmentCsv.name}
                            brand = {equipmentCsv.brand}
                            domain = {equipmentCsv.domain}
                            nbFaults = {equipmentCsv.nbFaults}
                            building =  {equipmentCsv.building}
                            niveau = {equipmentCsv.niveau}
                            local = {equipmentCsv.local}
                            model = {equipmentCsv.model}
                            serialNumber = {equipmentCsv.serialNumber}
                            quantity = {equipmentCsv.quantity}
                            status = {equipmentCsv.status}
                            notes = {equipmentCsv.notes}
                            photo = {defaultImage} 
                        />
                        <Checkpoints checkpoints = {checkpointCsv} fromCsv={true}/>
                    </div>
                    :
                    <h2>Aucunes Informations</h2>
                }
            </div>
        </div>   
    )  
}
