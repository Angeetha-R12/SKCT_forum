package skct.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import skct.example.demo.model.Post;

public interface PostRepository extends JpaRepository<Post,Long>{
    
}
