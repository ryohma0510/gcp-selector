import { createRoot } from 'react-dom/client';
import Option from './Option';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Option />);
