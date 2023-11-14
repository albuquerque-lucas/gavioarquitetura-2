import ClipLoader from 'react-spinners/ClipLoader';
import './styles/style.css';

export default function Loading({ isLoading }) {
  const color = '#000000';
  return (
    <div className="loading-container">
        <ClipLoader
        color={color}
        loading={isLoading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}