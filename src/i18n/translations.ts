import type { Language, Translations } from '../types'

export const translations: Record<Language, Translations> = {
  'en-US': {
    title: '🎲 Name Lottery',
    subtitle: 'Add names and let fate decide!',
    enterNames: 'Enter Names',
    namesCount: (count: number) => `${count} name${count !== 1 ? 's' : ''}`,
    placeholder: 'Enter names separated by commas or line breaks\ne.g., John, Sarah, Mike\nor one name per line',
    numberOfWinners: 'Number of Winners',
    drawButton: '🎯 DRAW WINNERS',
    drawing: 'Drawing...',
    winner: 'Winner',
    winners: 'Winners',
    alertNoNames: 'Please add some names first!',
    alertTooManyWinners: (requested: number, available: number) => 
      `You can't select more winners (${requested}) than available names (${available})!`,
  },
  'pt-BR': {
    title: '🎲 Sorteio de Nomes',
    subtitle: 'Adicione nomes e deixe o destino decidir!',
    enterNames: 'Digite os Nomes',
    namesCount: (count: number) => `${count} nome${count !== 1 ? 's' : ''}`,
    placeholder: 'Digite nomes separados por vírgulas ou quebras de linha\nex: João, Maria, Pedro\nou um nome por linha',
    numberOfWinners: 'Número de Vencedores',
    drawButton: '🎯 SORTEAR VENCEDORES',
    drawing: 'Sorteando...',
    winner: 'Vencedor',
    winners: 'Vencedores',
    alertNoNames: 'Por favor, adicione alguns nomes primeiro!',
    alertTooManyWinners: (requested: number, available: number) => 
      `Você não pode selecionar mais vencedores (${requested}) do que nomes disponíveis (${available})!`,
  },
}

