<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/workzone/blog/db/db.php';

class Post extends DB
{
    private $posts;
    private $post;
    private $count = 0;
    private $category, $author;

    // Все данные о блоге из базы
    function get_all_info() {
        $result = $this->db->prepare("SELECT pos.id, pos.title, pos.description, pos.text, pos.img, pos.date, 
                                                       cat.name AS category_name, auth.name AS author_name 
                                                FROM posts pos, categories cat, authors auth 
                                                WHERE pos.id_category = cat.id AND pos.id_author = auth.id 
                                                ORDER BY pos.id ASC");

        $result->execute();
        $result->setFetchMode(\PDO::FETCH_ASSOC);
        $allInfo = $result->fetchAll();

        return $allInfo;
    }

    // Добавить пост
    function add_post($data) {
        $title = $data['title'];
        $description = $data['description'];
        $text = $data['text'];
        $id_category = $data['id_category'];
        $id_author = $data['id_author'];
        $date_create = date('d:m:Y H:i:s');

        $result = $this->db->prepare("INSERT INTO posts (`title`,`description`,`text`,
                                                                   `date`,`id_category`,`id_author`) 
                                                VALUES (:title, :description, :text, :date_create, 
                                                        :id_category, :id_author)");
        $result->bindParam(':title', $title);
        $result->bindParam(':description', $description);
        $result->bindParam(':text', $text);
        $result->bindParam(':date_create', $date_create);
        $result->bindParam(':id_category', $id_category);
        $result->bindParam(':id_author', $id_author);
        $status = $result->execute();
        $result = null;

        if ($status) {
            return true;
        } else {
            return false;
        }
    }

    // Удалить пост
    function delete_post($data) {
        $id_post = $data['id_post'];

        $result = $this->db->prepare("DELETE FROM posts WHERE id = :id");
        $result->bindParam(':id', $id_post);
        $status = $result->execute();

        if ($status) {
            return true;
        } else {
            return false;
        }
    }

    // Изменить пост
    function update_post($data) {
        $id_post = $data['id_post'];
        $title = $data['title'];
        $description = $data['description'];
        $text = $data['text'];
        $id_category = $data['id_category'];
        $id_author = $data['id_author'];
        $new_date = date('d:m:Y H:i:s');

        $result = $this->db->prepare("UPDATE posts SET title = :title, description = :description, 
                                                text = :text, `date` = :new_date, id_category = :id_category, 
                                                id_author = :id_author WHERE id = :id_post");
        $result->bindParam(':title', $title);
        $result->bindParam(':description', $description);
        $result->bindParam(':text', $text);
        $result->bindParam(':new_date', $new_date);
        $result->bindParam(':id_category', $id_category);
        $result->bindParam(':id_author', $id_author);
        $result->bindParam(':id_post', $id_post);
        $status = $result->execute();

        if ($status) {
            return true;
        } else {
            return false;
        }
    }

    // Поставить лайк посту
    function set_post_like($data) {
        $id_post = $data['id_post'];

        $result = $this->db->prepare("UPDATE posts SET likes = likes + 1 WHERE id = :id_post");
        $result->bindParam(':id_post', $id_post);
        $status = $result->execute();

        if ($status) {
            return true;
        } else {
            return false;
        }
    }

    // Добавить коммент под пост
    function add_post_comment($data) {
        $id_post = $data['id_post'];
        $text = $data['text'];
        $id_author = $data['id_author'];
        $date_create = date('d:m:Y H:i:s');

        $result = $this->db->prepare("INSERT INTO comments (id_post, text, id_author, date_create) 
                                                VALUES id_post = :id_post, text = :text, 
                                                       id_author = :id_author, date_create = :date_create");
        $result->bindParam(':id_post', $id_post);
        $result->bindParam(':text', $text);
        $result->bindParam(':id_author', $id_author);
        $result->bindParam(':date_create', $date_create);
        $status = $result->execute();

        if ($status) {
            return true;
        } else {
            return false;
        }
    }

    // Достать комменты поста
    function get_post_comments($data) {
        $id_post = $data['id_post'];

        $result = $this->db->prepare("SELECT * FROM comments WHERE id_post = :id_post ORDER BY ASC");
        $result->bindParam(':id_post', $id_post);
        $result->execute();
        $result->setFetchMode(\PDO::FETCH_ASSOC);
        $list = $result->fetchAll();

        echo json_encode($list, JSON_UNESCAPED_UNICODE);
    }

    function get_start_posts()
    {
        $result = $this->db->prepare("SELECT * FROM posts ORDER BY id ASC LIMIT 6");
        $result->execute();
        $result->setFetchMode(\PDO::FETCH_ASSOC);
        $this->posts = $result->fetchAll();

        return $this->posts;
    }

    public function get_post_by_id($id)
    {
        $result = $this->db->prepare("SELECT * FROM posts WHERE id = :id");
        $result->bindParam(':id', $id);
        $result->execute();
        $result->setFetchMode(\PDO::FETCH_ASSOC);
        $posts = $result->fetchAll();
        $this->post = $posts[0];

        return $this->post;
    }

    function get_count_posts()
    {
        $result = $this->db->prepare("SELECT COUNT(*) FROM posts");
        $result->execute();
        $this->count = (int) $result->fetchColumn();

        return $this->count;
    }

    // Выбор названия категории по id
    function get_category_by_id($id)
    {
        $result = $this->db->prepare("SELECT * FROM categories WHERE id = :id");
        $result->bindParam(':id', $id);
        $result->execute();
        $result->setFetchMode(\PDO::FETCH_ASSOC);
        $category = $result->fetchAll();
        $this->category = $category[0]['name'];

        return $this->category;
    }

    // Выбор имени автора по id
    function get_author_by_id($id)
    {
        $result = $this->db->prepare("SELECT * FROM authors WHERE id = :id");
        $result->bindParam(':id', $id);
        $result->execute();
        $result->setFetchMode(\PDO::FETCH_ASSOC);
        $author = $result->fetchAll();
        $this->author = $author[0]['name'];

        return $this->author;
    }

    // Показать еще
    function show_more()
    {
        $startIndex = (int)$_POST['count_show'];
        $countView = (int)$_POST['count_add'];

        $result = $this->db->prepare('SELECT * FROM `posts` ORDER BY id ASC LIMIT :startIndex, :countView');
        $result->bindValue(':startIndex', $startIndex, PDO::PARAM_INT);
        $result->bindValue(':countView', $countView, PDO::PARAM_INT);
        $result->execute();
        $result->setFetchMode(\PDO::FETCH_ASSOC);
        $newPosts = $result->fetchAll();

        $html = "";
        foreach ($newPosts as $newPost) {
            $html .= '<li class="blog-post animated fadeIn" id="' . $newPost['id'] . '">';
            $html .= '<a href="/workzone/blog/post/?id=' . $newPost['id'] . '">';
            $html .= '<p class="image"><img src="' . $newPost['img'] . '" height="200px" width="200px"></p>';
            $html .= '<h3 class="title">' . $newPost['title'] . '</h3>';
            $html .= '<p class="date">' . date('d.m.Y в H:i', strtotime($newPost['date'])) . '</p>';
            $html .= '<p class="description">' . $newPost['description'] . '</p>';
            $html .= '</a>';
            $html .= '</li>';
        }

        return $html;
    }
}

