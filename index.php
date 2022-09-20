<?php

/*
    Plugin Name: Gutenberg slider
    Description: Gutenberg block slider
    Version: 1.0
    Author: Kamil Dębczak
    Author URI: https://github.com/Venusian09
*/

class GutenbergSlider {
    function __construct() {
        add_action('init', array($this, 'adminAssets'));
    }

    function adminAssets() {
        //Wywolanie skryptu (nazwa, ściezka, zaleznosci ktore sa uzywane w pliku js np wp-element do createElement)
        wp_register_script('gutenbergblock', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-components', 'wp-editor'));
        wp_enqueue_style('gutenbergCss', plugin_dir_url(__FILE__) . 'build/index.css');
        if (!is_admin()) {
            wp_enqueue_script('gutenbergFrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'), '1.0', true);
            wp_enqueue_style('gutenbergFrontendCss', plugin_dir_url(__FILE__) . 'build/frontend.css');
        }
        //rejestrujemy blok, pierwszy argument jest nazwa registerblocktype z index.js, drugi to array z funkcją budowania frontu
        register_block_type('customplugin/gutenbergslider', array(
            'editor_script' => 'gutenbergblock',
        ));
    }
}

$gutenbergSlider = new GutenbergSlider();