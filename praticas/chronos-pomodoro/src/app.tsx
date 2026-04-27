// 1º: Importamos as variáveis (o tema)
import './styles/theme.css';
// 2º: Importamos os estilos globais
import './styles/global.css';

import { Heading } from './components/Heading';

export function App() {
  return (
    <>
      <Heading />
    </>
  );
}
