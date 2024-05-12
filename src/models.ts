export interface Speaker {
    id: number
    name: string
    description: string
}

export interface Stage {
    id: number
    name: string
}

export interface Presentation {
    id: number
    name: string
    description: string

    start_date: string
    end_date: string

    stage_id: number
    speaker_id: number
}