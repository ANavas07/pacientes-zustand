import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { DraftPatient, Patient } from '../types'
import { v4 as uuidv4 } from 'uuid'

type PatientState = {
    patients: Patient[],
    activeID: Patient['id'], //Para la edicion
    addPatient: (data: DraftPatient) => void,
    deletePatient: (id: Patient['id']) => void,
    getPatientByID: (id: Patient['id']) => void,
}
//Toma paciente de tipo draft y retorna uno de tipo Patient
const createPatient = (patient: DraftPatient): Patient => {
    //Genera un id a cada paciente
    return { ...patient, id: uuidv4() }
}


//para crear un store es necesario importar "create"
export const usePatientStore = create<PatientState>()(
    devtools((set, get) => ({
        //Aqui se coloca el state tanto como las funciones que la modifican
        patients: [],
        activeID: '',
        addPatient: (data) => {
            const newPatient = createPatient(data)
            set((state) => ({
                patients: [...state.patients, newPatient]
            }))
        },
        deletePatient: (id) => {
            set((state) => ({
                patients: state.patients.filter(patient => patient.id != id)
            }))
        },
        getPatientByID: (id) => {
            set(() => ({
                activeID: id
            }))
        },
    })
))