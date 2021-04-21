
import { UPDATE_FILTER, SET_EQUIPEMENT_DATA , SET_CHECKPOINT_DATA} from './actionsType';

export const updateFilterAction = (equipments, isActive) => ({
    type: UPDATE_FILTER,
    payload: {equipments: equipments, isActive},
});

export const csvEquipmentReducer = (equipments) => ({
    type: SET_EQUIPEMENT_DATA,
    payload: {equipments}
});

export const csvCheckpointReducer = (checkpoints) => ({
    type: SET_CHECKPOINT_DATA,
    payload: {checkpoints}
});