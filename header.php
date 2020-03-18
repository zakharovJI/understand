<header class="header">
    <div class="head">
        <div class="logo"><i class="fas fa-blog fa-3x"></i></div>
        <div class="menu">
            <ul>
                <li><a href="/home/">Home</a></li>
                <li><a href="/blog/">Posts</a></li>
                <li><a href="/workzone/timetable/">Timetable</a></li>
            </ul>
            <div class="log">
                <ul>
                    <?php if (!isset($_SESSION['session_username'])) : ?>
                        <li class="in"><a href="/workzone/timetable/autorization/">Login</a></li>
                    <?php else: ?>
                        <li class="out"><a class="logout">Logout</a></li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
    </div>
</header>