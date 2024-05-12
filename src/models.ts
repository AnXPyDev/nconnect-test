export interface Speaker {
    id: number
    name: string
    description: string
    imagepath: string
}

export interface Stage {
    id: number
    name: string
}

export interface Timeslot {
    id: number

    start_at: string
    end_at: string

    stage_id: number
}

export interface Presentation {
    id: number
    name: string
    description: string
    long_description: string

    speaker_id: number
    timeslot_id: number
}