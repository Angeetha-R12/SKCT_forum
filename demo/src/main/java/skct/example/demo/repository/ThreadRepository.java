package skct.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import skct.example.demo.model.Thread;

public interface ThreadRepository extends JpaRepository<Thread,Long>{
    
}
