import { useState, useEffect } from "react";
import { BookForm } from "@/components/BookForm";
import { BookList } from "@/components/BookList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeProvider } from "next-themes";
import libraryHero from "@/assets/library-hero.jpg";

interface Book {
  id: string;
  title: string;
  author: string;
  dateAdded: string;
}

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);

  // Load books from localStorage on mount
  useEffect(() => {
    const savedBooks = localStorage.getItem('bookquet-books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  // Save books to localStorage whenever books change
  useEffect(() => {
    localStorage.setItem('bookquet-books', JSON.stringify(books));
  }, [books]);

  const handleBookAdded = (newBook: Book) => {
    setBooks(prevBooks => [newBook, ...prevBooks]);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-gradient-warm">
        {/* Header */}
        <header className="relative border-b border-border/50 bg-background/80 backdrop-blur-md">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-hero rounded-lg shadow-elegant">
                  <span className="text-2xl text-primary-foreground">📚</span>
                </div>
                <div>
                  <h1 className="font-serif text-2xl font-bold text-foreground">
                    Bookquet
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Your personal library tracker
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5"
            style={{ backgroundImage: `url(${libraryHero})` }}
          />
          <div className="relative container mx-auto px-4 py-16 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Track Your Literary Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Build and organize your personal library with Bookquet. 
              Keep track of the books you've read and discover your reading patterns.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Book Form */}
            <div className="lg:col-span-1">
              <BookForm onBookAdded={handleBookAdded} />
            </div>
            
            {/* Book List */}
            <div className="lg:col-span-2">
              <BookList books={books} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6 text-center">
            <p className="text-sm text-muted-foreground">
              Built with love for book enthusiasts
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
