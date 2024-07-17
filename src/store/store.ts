import {create} from 'zustand'
import { DraftPatient, Patient } from '../types'
import {v4 as uuidv4} from 'uuid'

type PatientState={
    patients: Patient[],
    addPatient:(data:DraftPatient)=> void
}
//Toma paciente de tipo draft y retorna uno de tipo Patient
const createPatient=(patient:DraftPatient): Patient=>{
    return{...patient, id:uuidv4()}
}


//para crear un store es necesario importar "create"
export const usePatientStore=create<PatientState>((set, get)=>({
    //Aqui se coloca el state tanto como las funciones que la modifican
    patients:[],
    addPatient:(data)=>{
        const newPatient=createPatient(data)
        set((state)=>({
            patients: [...state.patients, newPatient]
        }))
    }
}))