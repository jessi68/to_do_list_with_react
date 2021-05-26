import React, {useReducer, createContext,useContext, useRef} from 'react';

const initialTodos=
	  [
		  {
			  id:1,
			  text:'일단 니가준거말고 내가 이것저것 검색해서 만들어봄',
			  done:'true'
		  },
		  {
			  id:2,
			  text:'기능구현까지는 꾸역꾸역 알거같음',
			  done:'true'
		  },
		  {
			  id:3,
			  text:'문제는 css임',
			  done:'false'
		  },
		  {
			  id:4,
			  text:'간단한 css는 문제가 안되는데 리액트에 css를 넣으려니까 어려움',
			  done:'false'
		  },
		  {
			  id:5,
			  text:'그래서 일단 모르는 css는 그대로 베낌(의사클래스 <- 이건 아직 모르겠음)',
			  done:'false'
		  }  		  
	  ];

function todoReducer(state,action)
{
	let actionToFunc = new Map([
		['CREATE', () => state.concat(action.todo)],
		['TOGGLE', () => state.map(todo =>
			todo.id === action.id ? {...todo, done:!todo.done} : todo)],
		['REMOVE', () => state.filter(todo => todo.id !== action.id)]
		])

	if(actionToFunc.has(action.type)) {
		return actionToFunc[action.type]();
	} else{
		return "error";
	}
	
	
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();


export function TodoProvider({children})
{
	const[state, dispatch] = useReducer(todoReducer, initialTodos);
	const nextId=useRef(5);
	return(
		<TodoStateContext.Provider value={state}>
			<TodoDispatchContext.Provider value={dispatch}>
				<TodoNextIdContext.Provider value={nextId}>
					{children}
				</TodoNextIdContext.Provider>
			</TodoDispatchContext.Provider>
		</TodoStateContext.Provider>
	);
}


export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

export function useTodoNextId() {
  return useContext(TodoNextIdContext);
}
