import { useEffect } from 'react'
import Input from './components/Input/Input'
import ToDoItem from './components/ToDoItem/ToDoItem'
import { AppContainer, Main, MainContainer } from './styles/main.styles'
import useRenderItem from './hooks/useRenderItem';
import useItemsStore from './store/useItemsStore';
import { ToDoItemInterface } from './utils/interface';
import ModifyModal from './components/ModifyModal/ModifyModal';
import useModalIsOpen from './store/useModalIsOpen';

function App() {
  const { getDatas } = useRenderItem();
  const {items } = useItemsStore ();
  const { isOpen, setIsOpen } = useModalIsOpen();

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <AppContainer>
      <MainContainer>
        <Main>
          {items.map((item: ToDoItemInterface) => (
            <ToDoItem key={item.id} item={item} />
          ))}
        </Main>
        <Input />
      </MainContainer>
      { isOpen &&
        <ModifyModal setIsOpen={setIsOpen}/>
      }
    </AppContainer>
  );
}
export default App;