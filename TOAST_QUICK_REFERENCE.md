# 🎯 Toast Quick Reference

## One-Line Usage

```typescript
dispatch(showSnackbar({ message: 'Text here', type: 'success' }));
```

---

## 4 Types

| Type      | Color     | Icon | Usage                 |
| --------- | --------- | ---- | --------------------- |
| `success` | 🟢 Green  | ✓    | Successful operations |
| `error`   | 🔴 Red    | ✕    | Errors/failures       |
| `warning` | 🟠 Orange | ⚠    | Warnings/cautions     |
| `info`    | 🔵 Blue   | ℹ    | Information (default) |

---

## Setup (Already Done!)

✅ Component created: `src/components/Toast.tsx`  
✅ Added to App.tsx: `<Toast />`  
✅ Redux integrated: Uses `state.ui.snackbar`  
✅ Styled and animated

---

## Use Cases

### Success Example

```typescript
import { useAppDispatch } from '../store';
import { showSnackbar } from '../store/slices/uiSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();

  return (
    <Button
      onPress={() =>
        dispatch(
          showSnackbar({
            message: 'Saved successfully!',
            type: 'success',
          }),
        )
      }
      title="Save"
    />
  );
};
```

### Error Example

```typescript
try {
  await API.register(data);
} catch (error) {
  dispatch(
    showSnackbar({
      message: error.message,
      type: 'error',
    }),
  );
}
```

### Warning Example

```typescript
dispatch(
  showSnackbar({
    message: 'This action cannot be undone',
    type: 'warning',
  }),
);
```

### Info Example (Default)

```typescript
dispatch(
  showSnackbar({
    message: 'Loading your data...',
    // type: 'info' (optional, this is default)
  }),
);
```

---

## Features

- 🎨 4 color types
- ⏱️ Auto-dismisses in 3 seconds
- ✋ Manual dismiss with X button
- 🎭 Smooth slide animations
- 📱 Responsive positioning
- 🔗 Redux integrated
- 🎯 Global access

---

## File Locations

| File                          | Purpose     |
| ----------------------------- | ----------- |
| `src/components/Toast.tsx`    | Component   |
| `src/components/index.ts`     | Export      |
| `App.tsx`                     | Integration |
| `src/store/slices/uiSlice.ts` | Redux state |

---

## Imports Needed

```typescript
import { useAppDispatch } from '../store';
import { showSnackbar } from '../store/slices/uiSlice';
```

---

## Done! ✅

No installation needed. Toast is ready to use everywhere in your app.
