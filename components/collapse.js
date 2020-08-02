/** @jsx jsx */
import {
  cloneElement,
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef
} from 'react';
import {jsx, Box} from 'theme-ui';

const actionTypes = {
  toggle: 'toggle',
  collapse: 'collapse',
  expand: 'expand',
  setContentHeight: 'set-content-height',
  transitionEnd: 'transition-end'
};

function collapseReducer(state, action) {
  switch (action.type) {
    case actionTypes.setContentHeight:
      return init({...state, contentHeight: action.height});
    case actionTypes.expand:
      return init({...state, expanded: true});
    case actionTypes.collapse:
      return init({...state, expanded: false});
    case actionTypes.toggle:
      return init({
        ...state,
        expanded: !state.expanded,
        overflow: 'hidden'
      });
    case actionTypes.transitionEnd:
      return init({
        ...state,
        overflow: state.expanded ? 'visible' : 'hidden'
      });
    default:
      return init(state);
  }
}

function init(state) {
  const {contentHeight, expandedHeight, isDisabled, initiallyExpanded} = state;
  let maxHeight;
  let overflow = state.overflow;
  let expanded = state.expanded;

  if (typeof expanded === 'undefined') {
    expanded = initiallyExpanded;
    overflow = expanded ? 'visible' : 'hidden';
  }

  if (expanded) {
    // When expanded, use contentHeight if it is defined
    if (typeof contentHeight !== 'undefined') {
      maxHeight = contentHeight;
    }
  } else if (typeof expandedHeight !== 'undefined') {
    // When collapsed, use expandedHeight if it is defined
    maxHeight = Math.max(expandedHeight, 0);
  } else if (!isDisabled) {
    // Otherwise use 0 when expander is not disabled
    maxHeight = 0;
  }

  if (typeof maxHeight !== 'undefined') {
    // Use the pixel value when maxHeight is defined
    maxHeight = `${maxHeight}px`;
  }

  return {
    ...state,
    expanded,
    overflow,
    // Unset maxHeight when it is undefined
    maxHeight
  };
}

export const CollapseStateContext = createContext({});

export const CollapseDispatchContext = createContext(() => undefined);

export const useCollapseStateContext = () => useContext(CollapseStateContext);

export const useCollapseDispatchContext = () =>
  useContext(CollapseDispatchContext);

export function useCollapse() {
  const dispatch = useCollapseDispatchContext();
  const state = useCollapseStateContext();
  const contentRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      requestAnimationFrame(() => {
        if (!entry) {
          return;
        }

        const {height} = entry.target.getBoundingClientRect();
        dispatch({type: actionTypes.setContentHeight, height});
      });
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [contentRef, dispatch]);

  return [
    {
      ...state,
      contentRef
    },
    dispatch
  ];
}

export const Toggle = ({children}) => {
  const dispatch = useCollapseDispatchContext();

  return cloneElement(children, {
    onClick: () => dispatch({type: actionTypes.toggle})
  });
};

export const Manager = ({initiallyExpanded, children}) => {
  const [state, dispatch] = useReducer(
    collapseReducer,
    {initiallyExpanded},
    init
  );

  return (
    <CollapseDispatchContext.Provider value={dispatch}>
      <CollapseStateContext.Provider value={state}>
        {children}
      </CollapseStateContext.Provider>
    </CollapseDispatchContext.Provider>
  );
};

export const Panel = ({expanded, children}) => {
  const [state, dispatch] = useCollapse();
  const panelOverflow = expanded.map((e) => (e ? 'unset' : state.overflow));
  const maxHeight = expanded.map((e) => (e ? 'unset' : state.maxHeight));

  return (
    <Box
      sx={{
        overflow: panelOverflow,
        maxHeight,
        transition: 'max-height 250ms ease-out'
      }}
      onTransitionEnd={() => dispatch({type: actionTypes.transitionEnd})}
    >
      <Box
        ref={state.contentRef}
        sx={{
          flexGrow: [state.expanded ? 1 : 0, 1],
          transition: 'flex-grow 250ms ease-out'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
