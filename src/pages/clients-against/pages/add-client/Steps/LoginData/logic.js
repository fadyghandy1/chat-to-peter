import { useState } from 'react'

const Logic = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return {showPassword, handleClickShowPassword, handleMouseDownPassword }
}
export default Logic
