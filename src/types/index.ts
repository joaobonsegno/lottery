export type Language = 'en-US' | 'pt-BR' | 'cucos'

export interface Translations {
  title: string
  subtitle: string
  enterNames: string
  namesCount: (count: number) => string
  placeholder: string
  numberOfWinners: string
  drawButton: string
  drawing: string
  winner: string
  winners: string
  alertNoNames: string
  alertTooManyWinners: (requested: number, available: number) => string
}

