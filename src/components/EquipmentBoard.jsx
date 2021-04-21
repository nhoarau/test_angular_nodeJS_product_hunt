import React, { useCallback, useEffect} from 'react'
import Papa from 'papaparse'
import { useSelector, useDispatch} from 'react-redux';
import  EquipmentCard  from '../ui/EquipmentCard';
import  { BoardFilter } from './BoardFilter';
import equipments from '../equipments.csv';
import checkpoints from '../checkpoints.csv';
import { csvEquipmentReducer, csvCheckpointReducer } from '../store/actions/app';
import { useSetState } from '../hooks/customHook';
import { useFirebaseConnect } from 'react-redux-firebase'


export function EquipmentBoard() {

    useFirebaseConnect([
        'Equipments', 'Checkpoints' 
    ]);

    const getEquipments  = useSelector((state) => state.firebase.ordered.Equipments);
    const getCheckpoints = useSelector((state) => state.firebase.ordered.Checkpoints);
    
    const listFiltered = useSelector(state => state.filterBoard.equipments);
    const filterActive = useSelector(state => state.filterBoard.isActive);

    const [csvEquipmentValue, setcsvEquipmentValue, getcsvEquipmentValue] = useSetState([]);
    // eslint-disable-next-line no-unused-vars
    const [csvCheckpointValue, setcsvCheckpointValue, getcsvCheckpointValue] = useSetState([]);

    let listEquipments = [];
    let listEquipmentsFromCsv = [];
    let isLoading = true;

    const dispatch = useDispatch();

    const handleOnChange = useCallback( async () => {
        dispatch(csvEquipmentReducer(await getcsvEquipmentValue()));
        dispatch(csvCheckpointReducer(await getcsvCheckpointValue()));
      },[dispatch, getcsvEquipmentValue, getcsvCheckpointValue]
    );

    // Load csv files
    useEffect(() => {
        Papa.parse(equipments, {
        header: true,
        skipEmptyLines: true,
        download: true,
        encoding: "utf-8",
        delimiter: ';',
        complete: function(results) {
                if(getEquipments === undefined)
                {
                    setcsvEquipmentValue(results.data);
                    handleOnChange();
                }
            }
        });

        Papa.parse(checkpoints, {
            header: true,
            skipEmptyLines: true,
            download: true,
            encoding: "utf-8",
            delimiter: ';',
            complete: function(results) {
                if(getCheckpoints === undefined)
                {
                    setcsvCheckpointValue(results.data);
                    handleOnChange();
                }
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 
    // Apply filters selected
    if(getEquipments && getEquipments.length > 0) {
        listEquipments = listFiltered && listFiltered.length > 0 ? listFiltered : (getEquipments && getEquipments.length > 0  && !filterActive ? getEquipments : []);
        isLoading = false;
    } else if(csvEquipmentValue && csvEquipmentValue.length > 0) {
        listEquipmentsFromCsv = listFiltered && listFiltered.length > 0 ? listFiltered : (csvEquipmentValue && csvEquipmentValue.length > 0 && filterActive === false ? csvEquipmentValue : []);
        isLoading = false;
    }

    return (
        <div id="mainPage">
            <div id="filter">
                <BoardFilter />
            </div>
            <div id="equipmentBoard">
                { 
                    isLoading ?
                        <div className="spinner d-flex justify-content-center">
                            <div className="spinner-border text-info"  role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    :
                    filterActive && !(listFiltered.length > 0) ?
                        <div className="no-data">
                            <span>Aucun élément ne correspond au filtrage défini</span>
                        </div>
                    :
                    listEquipments &&  listEquipments.length > 0 ?
                        listEquipments.map(equipment => {
                            return (
                                <EquipmentCard key={equipment.key}
                                    equipmentId={equipment.key}
                                    name= {equipment.value.name}
                                    domain={ equipment.value.domain}
                                    photo= {equipment.value.photo}
                                    nbFaults = {equipment.value.nbFaults}
                                    brand = {equipment.value.brand}
                                />
                            )
                        })
                        :
                        !listEquipments.length > 0 && listEquipmentsFromCsv && listEquipmentsFromCsv.length > 0 ? listEquipmentsFromCsv.map(equipment => {
                            return (
                                <EquipmentCard key={equipment.key}
                                    equipmentId={equipment.key}
                                    name= {equipment.name}
                                    domain={ equipment.domain}
                                    nbFaults = {equipment.nbFaults}
                                />
                            )
                        }) : <h1>Aucunes données disponibles</h1>
                }
            </div>
        </div>
    );
}