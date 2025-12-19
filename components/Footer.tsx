export function Footer() {
  return (
    <footer className="bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto py-12 px-6 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; 2025 SoloBotAgency — One Bot. Infinite Tasks.</p>
        <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-200">Privacy</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-200">Terms</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-200">Contact</a>
        </div>
      </div>
    </footer>
  );
}