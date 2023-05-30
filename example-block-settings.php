<?php
/**
 * Plugin Name:       Example Block Settings
 * Description:       Example block settings plugin.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Brian Coords
 * Author URI:        https://www.briancoords.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       example-block-settings
 *
 * @package           example-block-settings
 */

/**
 * Enqueue editor specific modifications in the Post Editor.
 *
 * @return void
 */
function wp_dev_enqueue_editor_modifications() {
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_enqueue_script( 'example-block-settings', plugin_dir_url( __FILE__ ) . '/build/index.js', $asset_file['dependencies'], $asset_file['version'], true );

}
add_action( 'enqueue_block_editor_assets', 'wp_dev_enqueue_editor_modifications' );




function wp_dev_enqueue_block_assets() {
	$blocks = array( 'core/group', 'core/column' );
	foreach ( $blocks as $block ) {
		$src = plugin_dir_url( __FILE__ ) . '/build/style-index.css';
		if ( is_admin() ) {
			$src = plugin_dir_url( __FILE__ ) . '/build/index.css';
		}
		wp_enqueue_block_style(
			$block,
			array(
				'handle' => 'example-block-settings',
				'src'    => $src,
			)
		);
	}
}
add_action( 'after_setup_theme', 'wp_dev_enqueue_block_assets' );
